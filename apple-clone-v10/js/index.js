(() => {

    let YOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈앞에 보고있는) 씬 (scroll-section)


    const sceneInfo = [
        {
            // 0
            type:'sticky',
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container:document.querySelector('#scroll-section-0')
            }
        },
        {
            // 1
            type:'normal',
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container:document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type:'sticky',
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container:document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type:'sticky',
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container:document.querySelector('#scroll-section-3')
            }
        },
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for(let i = 0; i<sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight=0;
        for (let i = 0; i<sceneInfo.length; i++) {
            totalScrollHeight +=sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= YOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    
    function scrollLoop() {
        prevScrollHeight = 0;
        for(let i = 0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(YOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            console.log(currentScene);
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        if(YOffset < prevScrollHeight) {
            currentScene--;
            console.log(currentScene);
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        

        
    }

    window.addEventListener('scroll', () => {
        YOffset = window.pageYOffset;
        scrollLoop();
    })
    // window.addEventListener('DOMcontentLoaded', setLayout) 실행 시점이 load보다 빠름 이미지가 로드 되기 전에 HTML 돔 구조만 끝나면 로드를 시작하기 때문에..
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})();