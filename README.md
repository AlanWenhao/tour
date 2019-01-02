# tour

## backend repo
a node.js project [tour-backend](https://github.com/AlanWenhao/tour-backend)

## how to start

make sure that you have installed [redux dev-tool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon). Or the application would throw an error.

```bash
# install the dependences
$ npm install

# start dev server
$ npm run dev

👻 go to localhost:3000 and view the page
```

## what I use

## Repos that I want to try

[react-motion](https://github.com/chenglou/react-motion)  
[react-magic](https://github.com/lit-forest/react-magic)  
[popmotion](https://github.com/Popmotion/popmotion)  
[编辑器](https://github.com/margox/braft-editor)
[scroll animation](https://github.com/dbramwell/react-animate-on-scroll/blob/master/src/scroll-animation.js)  

## Links
[关于react动画  --知乎](https://zhuanlan.zhihu.com/p/28536964)  
[sample-blog](https://github.com/Weibozzz/next-blog)

## Site Design
[mapel](https://preview.themeforest.net/item/maple-an-elegant-responsive-blogging-theme/full_screen_preview/19678617)  
[bg](https://2.bp.blogspot.com/-ylf_86Z3jFU/WRNbiJF0YwI/AAAAAAAAAoE/Z5PRA2EQ_CIRU76i-a27yU5xpsQfhpsXACK4B/s0/pattern.png)  

## Remind
- to set `historyApiFallback` is a way to avoid `Cannot GET/**` after refresh browser
- user `withRouter` because when you have an export connect, you need to tell that that component will be using the router.
- use src img in jsx, you should import img as a module then webpack url loader can rerolve it. Do not use relative path because there is no `html-withimg-loader` in jsx. Jsx is a module rather than `html` file
- if you want to call side effects while a components props changing. It's better to use `componentDidupdate` rather than `componentWillRecieveProps`.[here is the reson](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#side-effects-on-props-change) and this blog remind us to cancel http request when unmounted the component.

## Backlog
- get method to fetch article detail


