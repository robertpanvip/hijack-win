export type Hack = (win: Window) => void
/**
 *
 * @param callback 得到window实例的回调
 */
const hack = (callback: Hack) => {
    function hackAsyncCreate(win: Window, settle: (element: HTMLIFrameElement) => void): void {
        callback(win)
        const onDOMNodeInserted = (target: Node) => {
            if (['iframe', 'frame'].includes(target.nodeName.toLowerCase())) {
                const iframe = target as HTMLIFrameElement
                if (iframe.contentWindow) {
                    hackAsyncCreate(iframe.contentWindow, settle)
                }
                settle(iframe)
            }
        }
        const onDOMContentLoaded = () => {
            const queries = win.document.querySelectorAll('iframe') || [];
            queries.forEach(element => {
                if (element.contentWindow) {
                    hackAsyncCreate(element.contentWindow, settle)
                }
            })
            win.removeEventListener("DOMContentLoaded", onDOMContentLoaded)
        }
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // 检查每个 mutation
                mutation.addedNodes.forEach(onDOMNodeInserted);
            });
        });
        const config = {childList: true, subtree: true, attributes: false, characterData: false};
        // 以上述配置开始观察目标节点
        observer.observe(win.document.documentElement, config)
        win.addEventListener("DOMContentLoaded", onDOMContentLoaded)
    }

    hackAsyncCreate(window, () => {
    });

    return null
}
export default hack
