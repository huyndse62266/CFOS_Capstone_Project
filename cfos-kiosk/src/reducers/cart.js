import * as Types from './../constants/ActionTypes';
const initState = {
    addedItems:[],
    total: 0,
    originPrice: 0,
    orderID: 0,
    findItem: ''
}


const cart = (state = initState,action) => {
    var { food, id, quantity } = action;
    if(action.type === Types.ADD_TO_CART){
        let addedItem = food
        addedItem.optionList = action.optionList;
        let exist_item = state.addedItems.find(item => item.foodId === food.foodId)
        if(exist_item){
            let totalOption  = 0;
            let priceSize = 0
            if(exist_item.optionList){
                exist_item.optionList.map(option => {
                    if(option.count === true){
                        
                        totalOption += option.optionPrice * option.quantity;
                    }
                    
                })
            }
            
            if(action.priceSize !== undefined){
                priceSize = action.priceSize
            }
            if(exist_item.priceSize !== undefined){
                priceSize = exist_item.priceSize
            }
           
            exist_item.cartQuantity += 1;
            exist_item.totalPrice +=  (totalOption + priceSize + exist_item.price*(100-addedItem.promotion)/100);
            exist_item.totalPriceOrigin +=  (totalOption + priceSize + exist_item.price);
            return{
                ...state,
                total: state.total  + totalOption + priceSize + exist_item.price*(100-addedItem.promotion)/100,
                originPrice: state.originPrice  + (exist_item.price + totalOption)
            }
        }else{
            let totalOption  = 0;
            let priceSize = 0
            addedItem.cartQuantity = quantity;
            addedItem.priceSize = action.priceSize;
            addedItem.choosePriceSize = action.choosePriceSize;
            if(action.optionList){
                action.optionList.map(option => {
                    if(option.count === true){
                        totalOption += option.optionPrice * option.quantity;
                    }
                })
            }
            
            if(action.priceSize !== undefined){
                priceSize = action.priceSize
            }
            addedItem.totalPrice = (addedItem.price* ((100-addedItem.promotion)/100) + totalOption + priceSize) * quantity;
            addedItem.totalPriceOrigin = (addedItem.price + totalOption + priceSize) * quantity;
            let newTotal = state.total + (addedItem.price* ((100-addedItem.promotion)/100) + totalOption + priceSize) * quantity  
            let newOrigin = state.originPrice + (addedItem.price + totalOption + priceSize) *quantity
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal,
                originPrice: newOrigin
            }
        }
    }

    if(action.type === Types.REMOVE_CART){
        let itemToRemove = state.addedItems.find(item => item.foodId === id)
        let totalOption = 0
        if(itemToRemove.optionList){
            itemToRemove.optionList.map(option => {
                if(option.count === true){
                    totalOption += option.optionPrice * option.quantity;
                }
                
            })
        } 
        let newItems = state.addedItems.filter(item => item.foodId !== id)
        let newTotal = state.total - (itemToRemove.price* ((100-itemToRemove.promotion)/100)  + totalOption) * itemToRemove.cartQuantity ;
        let newOrigin = state.originPrice - (itemToRemove.price + totalOption) * itemToRemove.cartQuantity
        return {
            ...state,
            addedItems: newItems,
            total: newTotal,
            originPrice: newOrigin
        }
    }

    if(action.type === Types.ADD_QUANTITY){
        let addedItem = state.addedItems.find(item => item.foodId === id)
        let totalOption  = 0;
        let priceSize = 0
        if(addedItem.optionList){
            addedItem.optionList.map(option => {
                if(option.count === true){
                    totalOption += option.optionPrice * option.quantity;
                }
                
            })
        }
        if(addedItem.priceSize !== undefined){
            priceSize = addedItem.priceSize
        }
        addedItem.cartQuantity += 1;
        addedItem.totalPrice += (addedItem.price* ((100-addedItem.promotion)/100) + totalOption + priceSize) ;
        addedItem.totalPriceOrigin += (addedItem.price + totalOption + priceSize);
        let newTotal = state.total + (addedItem.price*((100-addedItem.promotion)/100)+totalOption+priceSize)
        let newOrigin =  state.originPrice + (addedItem.price + totalOption + priceSize)
        return{
            ...state,
            total: newTotal,
            originPrice: newOrigin
        }   
    }

    if(action.type === Types.SUB_QUANTITY){
        let addedItem = state.addedItems.find(item => item.foodId === id)
        let totalOption = 0
        let priceSize = 0
        if(addedItem.optionList){
            addedItem.optionList.map(option => {
                if(option.count === true){
                    totalOption += option.optionPrice * option.quantity;
                }
            })
        }  
        
        if(addedItem.priceSize !== undefined){
            priceSize = addedItem.priceSize
        }
        if(addedItem.cartQuantity === 1){
            let newItems = state.addedItems.filter(item => item.foodId !== id)
            let newTotal = state.total - (addedItem.price*((100-addedItem.promotion)/100)+totalOption+priceSize)
            let newOrigin =  state.originPrice - (addedItem.price+totalOption+priceSize)
            return {
                ...state,
                addedItems: newItems,
                total: newTotal,
                originPrice: newOrigin
            }
        }else{
            addedItem.cartQuantity -= 1
            addedItem.totalPrice -= (addedItem.price* ((100-addedItem.promotion)/100) + totalOption + priceSize) ;
            addedItem.totalPriceOrigin -= (addedItem.price + totalOption + priceSize);
            let newTotal = state.total - (addedItem.price*((100-addedItem.promotion)/100)+totalOption + priceSize);
            let newOrigin = state.originPrice - (addedItem.price + totalOption + priceSize)
            return{
                ...state,
                addedItems: state.addedItems,
                total: newTotal,
                originPrice: newOrigin
            }
        }
    }
    if(action.type === Types.UPDATE_ITEM_CART){
        let addedItem = state.addedItems.find(item => item.foodId === id)
        let oldQuantity = addedItem.cartQuantity
        if(addedItem){
            if(quantity === 0){
                let totalOption = 0
                addedItem.optionList.map(option => {
                    if(option.count === true){
                        totalOption += option.optionPrice * option.quantity;
                    }
                    
                })
                let newTotal = state.total - (addedItem.price*((100-addedItem.promotion)/100) + totalOption+addedItem.priceSize) * oldQuantity ;
                let newOrigin = state.originPrice - (addedItem.price + totalOption+addedItem.priceSize)* oldQuantity;
                let newItems = state.addedItems.filter(item => item.foodId !== id)
                return{
                    ...state,
                    addedItems: newItems,
                    total: newTotal,
                    originPrice: newOrigin
                }   
            }else{
                let totalOption  = 0;
                let priceSize =0;
                if(action.priceSize != undefined){
                    priceSize = action.priceSize
                }
                if(action.optionList){
                    action.optionList.map(option => {
                        if(option.count === true){
                            totalOption += option.optionPrice * option.quantity;
                        }
                    })
                }
            
                let newTotal = 0
                let newOrigin = 0
                let addPriceSize = 0;

                let addPrice = (addedItem.price * ((100-addedItem.promotion)/100)  + totalOption + priceSize)* quantity - addedItem.totalPrice 
                let addPriceOrigin = (addedItem.price  + totalOption + priceSize) * quantity - addedItem.totalPriceOrigin 
                addedItem.cartQuantity = quantity;
                addedItem.optionList = action.optionList;
                addedItem.choosePriceSize = action.choosePriceSize;
                addedItem.priceSize = addedItem.priceSize+action.priceSize;
                addedItem.totalPrice = addedItem.totalPrice + addPrice
                addedItem.totalPriceOrigin = addedItem.totalPriceOrigin + addPriceOrigin
                newTotal = state.total + addPrice;
                newOrigin = state.originPrice + addPriceOrigin;      
                return{
                    ...state,
                    total: newTotal,
                    originPrice: newOrigin
                }   
            }
        }
            
            
    }
    if(action.type === Types.RESTORE_CART){
        let newCart = state.addedItems.filter(item => item.foodId === 0)
        return{
           ...state,
           addedItems: newCart,
           total: 0,
           originPrice: 0
        }
    }
    if(action.type === Types.FIND_CART){
        let addedItem = state.addedItems.find(item => item.foodId === id)
        return {
            ...state,
            findItem: addedItem
        }
    }



    return state
};

export default cart;