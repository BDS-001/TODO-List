 export const navigation = (function() {
    let cache = null

    function hilightElement(e) {
        if (cache) cache.style.backgroundColor = 'inherit';
        e.target.parentNode.style.backgroundColor = 'var(--hilight-sidebar)';
        cache = e.target.parentNode;
    }

    function getContent(view) {
        const content = document.querySelector('#content')
        
        //tmp for testing
        content.innerHTML = view
    }
    
    function changeView(e) {
        e.preventDefault()
        getContent(e.target.innerHTML)
        hilightElement(e)
    }

    function addNavigationClickEvent(element) {
        element.addEventListener('click', navigation.changeView)
    }

    return { changeView,addNavigationClickEvent }

 })();