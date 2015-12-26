/**
 * Created by zhangyumou on 15/12/26.
 */
suite('Global Tests', function () {
    test('page has a valid title', function () {
        assert(document.title && document.title.match(/\S/) && document.title.toLocaleUpperCase() !== 'TODO');
    })
})