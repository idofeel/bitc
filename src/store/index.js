import { createStore } from 'vuex'

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules = {},modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    modules[moduleName] = modulesFiles(modulePath).default;
    return modules
    
}, {});

const GlobalStore = createStore({
	state: {
		test: 12313,
		test2: 'asdasd',
		gg: 22
    },
    modules
   
})

export default GlobalStore
