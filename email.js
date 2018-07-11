const postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

const input = document.querySelector('#email-input');
const list = document.querySelector('#email-sug-wrapper');

var selectedIndex = 0;

function focusInput() {
    input.focus();
}

const handleInput = {
    addEmailList: function(event) {
        const inputTexts = this.formatInput(input.value);
        this.getOptions(inputTexts);
        handleKeydown.highlightOption(0);
    },
    completeEmail: function(event) {
        if (event.target.localName === 'li') {
            input.value = htmlUtil.htmlDecode(event.target.innerHTML);
            this.removeOptions();
            focusInput();
        }
    },
    getOptions: function(inputTexts) {
        this.removeOptions();
        list.style.visibility = 'hidden';
        if (inputTexts[0]) {
            this.createOptions(inputTexts);
            list.style.visibility = 'visible';
        }
    },
    removeOptions: function() {
        const length = list.childNodes.length;
        for (i = 0; i < length; i++) {
            list.removeChild(list.lastChild);
        }
    },
    createOptions: function(inputTexts) {
        const filteredList = this.filterPostfix(inputTexts[1] || '');
        for (let postfix of filteredList) {
            const node = document.createElement('li');
            const encodedText = htmlUtil.htmlEncode(inputTexts[0] + '@' + postfix);
            const text = document.createTextNode(encodedText);
            node.appendChild(text);
            list.appendChild(node);
        }
    },
    filterPostfix: function(inputPostfix) {
        const filtered = postfixList.filter(postfix => new RegExp('^' + inputPostfix, 'gi').test(postfix));
        return (filtered.length) ? filtered : postfixList;
    },
    formatInput: function(inputText) {
        return inputText.split('@').map(splitText => splitText.trim());
    }

};

const handleKeydown = {
    handler: function(event) {
        if (event.key === 'Escape') {
            input.select();
        }
        if (list.childNodes.length) {
            list.childNodes[selectedIndex].classList.remove('selected');
            if (event.key === 'ArrowDown') {
                this.getNextOption(1);
            } else if (event.key === 'ArrowUp') {
                this.getNextOption(-1);
            } else if (event.key === 'Enter') {
                this.selectCurrentOption();
            }
        }
    },
    highlightOption: function(index) {
        if (list.childNodes.length && list.childNodes[index]) {
            list.childNodes[index].classList.add('selected');
            selectedIndex = index;
        }
    },
    getNextOption: function(down) {
        const nodeLength = list.childNodes.length;
        if (selectedIndex + down >= 0 && selectedIndex + down <= nodeLength - 1) {
            this.highlightOption(selectedIndex + down);
        } else if (down < 0) {
            this.highlightOption(nodeLength - 1);
        } else if (down > 0) {
            this.highlightOption(0);
        }
    },
    selectCurrentOption: function() {
        input.value = list.childNodes[selectedIndex].textContent;
        handleInput.removeOptions();
    }
};

const htmlUtil = {
    htmlEncode: function(html) {
        var temp = document.createElement("div");
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    htmlDecode: function(text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
};
