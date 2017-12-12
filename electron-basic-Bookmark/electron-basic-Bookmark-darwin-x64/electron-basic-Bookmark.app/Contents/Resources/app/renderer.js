const {ipcRenderer, clipboard, shell} = require('electron');//메인프로세스의 데이터를 받기 위함
let type = 'home';
let data = [];

const btnHome = document.querySelector('#btn-home');
const btnGithub = document.querySelector('#btn-github');

// 버튼 초기화
btnHome.classList.add('active');
btnGithub.classList.remove('active');

ipcRenderer.on('update', (event, _data) => {
    data = _data;
    update();
});

btnHome.addEventListener('click', () => {
    if(type === 'home') {//type이 home면 더 이상 동작하지 않는다.
        return;
    }
    btnHome.classList.add('active');
    btnGithub.classList.remove('active');
    type = 'home';
    update();
});

btnGithub.addEventListener('click', () => {
    if(type === 'github') {
        return;
    }
    btnGithub.classList.add('active');
    btnHome.classList.remove('active');
    type = 'github';
    update();
});

function update() {
    const items = data.filter((item, index) => {
        item.removeId = index;
        return item.type === type;
    });
    const htmls = items.map(item => {
        return `
        <li class="list-group-item">
            <div class="media-body">
                <strong><a href="#">${item.url}</a></strong>
                <p>
                    ${item.title}
                    <span class="icon icon-trash pull-right"></span>
                </p>
            </div>
        </li>
        `
    });
    const html = htmls.join('');
    document.querySelector('#data').innerHTML = html;
    const removeDoms = document.querySelectorAll('.icon-trash');
    removeDoms.forEach((removeDom, index) => {
        removeDom.addEventListener('click', () => {
            ipcRenderer.send('remove', items[index].removeId);
        });
    });
    const openDoms = document.querySelectorAll('.list-group-item a');
    openDoms.forEach(openDom => {
        openDom.addEventListener('click', (e) => {
            shell.openExternal(e.target.innerHTML);//e.target.innerHTML a태그가 감싸고 있는 url을 가져온다.
        });
    });
}

document.addEventListener('paste', () => {
    //electron에서 제공하는 clipboard 사용
    const text = clipboard.readText();
    const item = {
        type: type,
        url: text
    };
    ipcRenderer.send('paste', item);
})
