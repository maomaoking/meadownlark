/**
 * Created by zhangyumou on 15/12/26.
 */

suite('Page Tests', function () {
    test('page has a valid fortune', function () {
        assert(document.getElementsByTagName("blockquote").length > 0 && document.getElementsByTagName("blockquote")[0].innerText.length > 0);
    })
})