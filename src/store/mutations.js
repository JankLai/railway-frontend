export default {
    SET_ALUMNIS :(state ,{alumnis}) => {
        let i =0
        for(i in alumnis){
            alumnis[i]["修改"] = "u"
            alumnis[i]["删除"] = "d"
        }         
        state.alumnis = alumnis;
    },
    SET_LIMIT_ALUMNIS :(state, {alumnis}) => {
        let i =0
        for(i in alumnis){
            alumnis[i]["修改"] = "u"
            alumnis[i]["删除"] = "d"
        }
        alumnis = [...state.limitAlumnis, ...alumnis];
        state.limitAlumnis = alumnis;
        if(state.startNum == 1)
            state.startNum += 10
        else 
            state.startNum +=5
    },
    SEARCH_ALUMNI :(state, {alumnis}) => {
        let i =0
        for(i in alumnis){
            alumnis[i]["修改"] = "u"
            alumnis[i]["删除"] = "d"
        }   
        state.searchAlumniResults = alumnis;
    },
    DELETE_ALUMNI :(state, {id}) => {
        //删除指定元素
        state.alumnis = state.alumnis.filter((e)=>e.id !== id),
        state.searchAlumniResults = state.searchAlumniResults.filter((e)=>e.id !== id)
    },
    UPDATE_ALUMNI :(state, {payload}) => {
        const item = state.alumnis.find(item => item.id === payload.id);
        if(item){
            Object.assign(item, payload);
        }
        const item2 = state.searchAlumniResults.find(item2 => item2.id === payload.id);
        if(item2){
            Object.assign(item2, payload);
        }
        
    }
    // appendPet: (state, {species, pet}) => {
    //     //accept actions'axios and assign value to state
    //     state[species].push(pet);
    // }
}