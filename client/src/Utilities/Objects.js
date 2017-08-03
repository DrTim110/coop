const array = [
    {
        type: 'portfolioitem/initiative',
        label: 'Initiative',
        labelPlural: 'Initiatives',
        childType: 'portfolioitem/epic',
        color: 'default'
    },
    {
        type: 'portfolioitem/epic',
        label: 'Epic',
        labelPlural: 'Epics',
        childType: 'portfolioitem/feature',
        color: 'primary'
    },
    {
        type: 'portfolioitem/feature',
        label: 'Feature',
        labelPlural: 'Features',
        childType: 'hierarchicalrequirement',
        color: 'warning'
    },
    {
        type: 'hierarchicalrequirement',
        label: 'Story',
        labelPlural: 'Stories',
        color: 'info'
    },
    {
        type: 'task',
        label: 'Task',
        labelPlural: 'Tasks',
        color: 'success'
    }
];

const ObjectsMap = {}; //build map from the array so there is one truth to change
for(let obj of array){
    ObjectsMap[obj.label] = obj;
    ObjectsMap[obj.type] = obj;
}

export {
    ObjectsMap as default, 
    array as ObjectsArray
};