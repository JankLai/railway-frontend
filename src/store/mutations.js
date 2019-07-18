export default {
    // SET_ALUMNIS :(state ,{alumnis}) => {
    //     let i =0
    //     for(i in alumnis){
    //         alumnis[i]["修改"] = "u"
    //         alumnis[i]["删除"] = "d"
    //     }         
    //     state.alumnis = alumnis;
    // },
    // SET_LIMIT_ALUMNIS :(state, {alumnis}) => {
    //     let i =0
    //     for(i in alumnis){
    //         alumnis[i]["修改"] = "u"
    //         alumnis[i]["删除"] = "d"
    //     }
    //     alumnis = [...state.limitAlumnis, ...alumnis];
    //     state.limitAlumnis = alumnis;
    //     if(state.startNum == 1)
    //         state.startNum += 10
    //     else 
    //         state.startNum +=5
    // },
    SET_ROLE : (state, text) => {
        state.role = text;
    },

    SEARCH :(state, {searchResults}) => {
        let i =0
        for(i in searchResults){
            searchResults[i]["删除"] = "d"
        }   
        state.searchResults = searchResults;
    },

    DELETE :(state, {id}) => {
        //删除指定元素
        state.searchResults = state.searchResults.filter((e)=>e.id !== id)
    },

    UPDATE :(state, {payload}) => {
        //找到对应Id的item
        const item = state.searchResults.find(item => item.id === payload.id);
        if(item){
            //将item重新赋值 
            Object.assign(item, payload);
        }    
    },

    SET_DATE_AMOUNT: (state, {dateAmount}) => {
        for(var i = 0; i<dateAmount.length; i++) {
            state.dateAmountX = [...state.dateAmountX, dateAmount[i]['date'].slice(0,10)];          
            state.dateAmountY = [...state.dateAmountY, dateAmount[i]['amount']];          
        }  
    },
    SET_TRANSPORT_AMOUNT: (state, {transportAmount}) => {
        for(var i = 0; i<transportAmount.length; i++) {
            state.transportAmountX = [...state.transportAmountX, transportAmount[i]['transport']];
            state.transportAmountY = [...state.transportAmountY, transportAmount[i]['amount']];
        }  
        // state.transportAmount = transportAmount;
    },
    SET_GOODS_AMOUNT:(state, {goodsAmount}) => {
        for(var i = 0; i<goodsAmount.length; i++) {
            state.goodsAmountX = [...state.goodsAmountX, goodsAmount[i]['goods']];
            state.goodsAmountY = [...state.goodsAmountY, goodsAmount[i]['amount']];
        } 
    },
    SET_OD_AMOUNT:(state, {odAmount}) => {
        for(var i = 0; i<odAmount.length; i++) {
            state.odAmountX = [...state.odAmountX, odAmount[i]['od']];
            state.odAmountY = [...state.odAmountY, odAmount[i]['amount']];
        } 
    },
    SET_FOOTER_TEXT :(state , {text}) => {
        state.footer_text = text
    },
    SET_DATA :(state, {odAmount}) => {
        state.data = odAmount;
    },
    SET_GEOCOORDMAP :(state, {odLocation}) => {
        state.geoCoordMap = odLocation
    }
}