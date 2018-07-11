const postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

const input = document.querySelector('#email-input');
const list = document.querySelector('#email-sug-wrapper');

var selectedIndex = 0;

function focusInput() {
    input.focus();
}

function addEmailList(event) {
    const inputTexts = formatInput(event.target.value);
    getOptions(inputTexts);
    highlightOption(0);
}

function completeEmail(event) {
    if (event.target.localName === 'li') {
        input.value = event.target.textContent;
        removeOptions();
        focusInput();
    }
}

function getOptions(inputTexts) {
    removeOptions();
    list.style.visibility = 'hidden';
    if (inputTexts[0]) {
        createOptions(inputTexts);
        list.style.visibility = 'visible';
    }
}

function removeOptions() {
    const length = list.childNodes.length;
    for (i = 0; i < length; i++) {
        list.removeChild(list.lastChild);
    }
}

function createOptions(inputTexts) {
    const filteredList = filterPostfix(inputTexts[1] || '');
    for (let postfix of filteredList) {
        const node = document.createElement('li');
        const text = document.createTextNode(inputTexts[0] + '@' + postfix);
        node.appendChild(text);
        list.appendChild(node);
    }
}

function filterPostfix(inputPostfix) {
    const filtered = postfixList.filter(postfix => new RegExp('^' + inputPostfix, 'gi').test(postfix));
    return (filtered.length) ? filtered : postfixList;
}

function formatInput(inputText) {
    return inputText.split('@').map(splitText => splitText.trim());
}

function handleKeydown(event) {
    if (event.key === 'Escape') {
        input.select();
    }
    if (list.childNodes.length) {
        list.childNodes[selectedIndex].classList.remove('selected');
        if (event.key === 'ArrowDown') {
            getNextOption(1);
        } else if (event.key === 'ArrowUp') {
            getNextOption(-1);
        } else if (event.key === 'Enter') {
            selectCurrentOption();
        }
    }
}

function highlightOption(index) {
    if (list.childNodes.length && list.childNodes[index]) {
        list.childNodes[index].classList.add('selected');
        selectedIndex = index;
    }
}

function getNextOption(down) {
    const nodeLength = list.childNodes.length;
    if (selectedIndex + down >= 0 && selectedIndex + down <= nodeLength - 1) {
        highlightOption(selectedIndex + down);
    } else if (down < 0) {
        highlightOption(nodeLength - 1);
    } else if (down > 0) {
        highlightOption(0);
    }
}

function selectCurrentOption() {
    input.value = list.childNodes[selectedIndex].textContent;
    removeOptions();
}