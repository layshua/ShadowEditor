import Control from './Control';
import UI from './Manager';

/**
 * 文本域
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function TextArea(options) {
    Control.call(this, options);
    options = options || {};

    this.value = options.value || '';
    this.cls = options.cls || 'TextArea';
    this.style = options.style || null;

    this.onChange = options.onChange || null;
    this.onKeyUp = options.onKeyUp || null;
};

TextArea.prototype = Object.create(Control.prototype);
TextArea.prototype.constructor = TextArea;

TextArea.prototype.render = function () {
    this.dom = document.createElement('textarea');

    this.dom.className = this.cls;

    if (this.style) {
        Object.assign(this.dom.style, this.style);
    }

    this.dom.spellcheck = false;

    var _this = this;

    this.dom.addEventListener('keydown', function (event) {
        event.stopPropagation();

        if (event.keyCode === 9) {
            event.preventDefault();

            var cursor = _this.dom.selectionStart;
            _this.dom.value = _this.dom.value.substring(0, cursor) + '\t' + _this.dom.value.substring(cursor);
            _this.dom.selectionStart = cursor + 1;
            _this.dom.selectionEnd = _this.dom.selectionStart;
        }

    }, false);

    this.parent.appendChild(this.dom);

    if (this.onChange) {
        this.dom.addEventListener('change', this.onChange.bind(this));
    }

    if (this.onKeyUp) {
        this.dom.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    this.setValue(this.value);
};

TextArea.prototype.getValue = function () {
    return this.dom.value;
};

TextArea.prototype.setValue = function (value) {
    this.dom.value = value;
    return this;
};

UI.addXType('textarea', TextArea);

export default TextArea;