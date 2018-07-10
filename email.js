const postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

const input = document.querySelector('#email-input');
const list = document.querySelector('#email-sug-wrapper');

function addEmailList(event) {
    const inputTexts = formatInput(event.target.value);
    getOptions(inputTexts);
}

function completeEmail(event) {
    if (event.target.localName === 'li') {
        input.value = event.target.innerHTML;
        removeOptions();
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