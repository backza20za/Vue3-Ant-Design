import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex'
import { bookType, cart, promotions } from '../types/books.type'
import httpClient from '../utils/httpClient'
import axios from 'axios'

// define your typings for the store state


export interface State {
    count: number,
    book: bookType[],
    detail: bookType,
    cart: cart[],
    promotion: promotions,
    price: number,
    discount: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        count: 0,
        book: [],
        detail: {
            id: 0,
            title: "",
            author: "",
            price: 0,
            description: "",
            images: {
                jpeg: "",
                avif: "",
                webp: ""
            }
        },
        cart: [],
        promotion: {
            id: 0,
            type: "",
            name: "",
            targetIds: [],
            discounts: []
        },
        price: 0,
        discount: 0
    },
    getters: {
        getCount(state) {
            return state.count
        },
        getBooks(state) {
            return state.book
        },
        getDetail(state) {
            return state.detail
        },
        getCart(state) {
            return state.cart
        },
        getPrice(state) {
            return state.price
        },
        getPromotion(state) {
            return state.promotion
        },
        getDiscount(state) {
            return state.discount
        },
    },
    mutations: {
        increment(state: State, value) {
            state.count = value
        },
        setAddtoCart(state: State, value) {

            if (value.id === 0) {
                state.cart.push(value.data)
            } else {
                state.cart = value.data
            }
        },
        setAddPrice(state: State, value) {
            state.price = value
        },
        setAddBookCount(state: State, value) {

            if (value.id === 0) {
                state.cart.push(value.data)
            } else {
                state.cart = value.data
            }

        },
        setAddPriceCount(state: State, value) {
            state.price = value
        },
        setDelBookCount(state: State, value) {

            state.cart = value


        },
        setDelPriceCount(state: State, value) {

            state.price = value
        },
        setDropBook(state: State, value) {

        },
        setDropPrice(state: State, value) {

            state.price = value
        },
        addBook(state: State, value) {
            state.book = value

        },
        setBookDetail(state: State, value) {
            state.detail = value

        },
        setBuySuccess(state: State) {
            // insert to database
            state.cart = []
            state.count = 0
            state.price = 0

        },
        addPromotion(state: State, value) {
            state.promotion = value.data
            state.discount = value.data.discounts[value.id]

        }
    },
    actions: {
        increment(context) {
            context.commit('increment', (this.state.count + 1))
        },
        addtoCart(context, value) {
            context.commit('increment', (this.state.count + 1))
            context.commit('setAddPrice', this.state.price + parseFloat(value.price))
            let counter: number = 0
            const response = this.state.cart.map((data: cart, index: number) => {
                if (data.id === value.id) {
                    counter++
                    let newPrice: number = (Number(data.price) + Number(value.price))
                    let newCount: number = (data.count + value.count)
                    return { ...data, count: newCount, price: String(newPrice) }
                }
                return data
            })
            if (counter === 0) {
                context.commit('setAddtoCart', { id: counter, data: value })
            } else {
                context.commit('setAddtoCart', { id: counter, data: response })
            }

        },
        addBookCount(context, value) {
            // context.commit('setAddBookCount', value)
            context.commit('increment', (this.state.count + 1))
            context.commit('setAddPriceCount', (this.state.price + parseFloat(value.price)))
            let counter: number = 0
            const response = this.state.cart.map((data: cart, index: number) => {
                if (data.id === value.id) {
                    counter++
                    let newPrice: number = Number(data.price) + Number(value.price)
                    let newCount: number = (data.count + value.count)
                    return { ...data, count: newCount, price: String(newPrice) }
                }
                return data
            })
            if (counter === 0) {
                context.commit('setAddBookCount', { id: counter, data: value })
            } else {
                // state.cart = response
                context.commit('setAddBookCount', { id: counter, data: response })
            }
        },
        delBookCount(context, value) {
            // context.commit('setDelBookCount', value)
            context.commit('increment', (this.state.count - 1))
            // context.commit('setDelPriceCount', value.price)
            context.commit('setDelPriceCount', (this.state.price - Number(value.price)))

            var counter: number = 0
            var check: number = 0
            var num: number = 0
            const response = this.state.cart.map((data: cart, index: number) => {
                if (data.id === value.id) {
                    num = index
                    counter++
                    let newPrice = Number(data.price) - Number(value.price)
                    let newCount = data.count - value.count
                    if (newCount === 0) {
                        check = 1
                    } else {

                    }
                    return { ...data, count: newCount, price: String(newPrice.toFixed(2)) }
                }
                return data
            })
            if (check === 1) {
                // context.commit('setDelBookCount', { id: check, data: this.state.cart.splice(1, 1) })
                this.state.cart.splice(num, 1)
            } else {
                // state.cart = response
                context.commit('setDelBookCount', response)
            }

        },
        dropBook(context, value) {
            // context.commit('setDropBook', value)
            context.commit('increment', (this.state.count - value.count))

            var check: number = 0
            var num: number = 0
            var newPrice: number = 0
            const response = this.state.cart.map((data: cart, index: number) => {
                if (data.id === value.id) {
                    num = index
                    check = 1
                    newPrice = Number(data.price)
                    return { data }
                }
                return data
            })
            if (check === 1) {
                this.state.cart.splice(num, 1)
                context.commit('setDropPrice', (this.state.price - newPrice))
                // this.state.price - newPrice
            }

        },
        addBookDetail(context, value) {
            context.commit('setBookDetail', value)
        },
        buySuccess(context) {
            context.commit('setBuySuccess')
        },
        async getBook(context) {
            const response = await httpClient.get(`/books`)
            context.commit("addBook", response.data)
        },
        async getPromotion(context) {
            const response = await httpClient.get(`/promotions`)
            // context.commit("addPromotion", response.data[0])

            let countPromotion: number = 0
            const resp = this.state.cart.map((data: cart, index: number) => {
                for (var i = 0; i < response.data[0].targetIds.length; i++) {
                    if (data.id === response.data[0].targetIds[i]) {
                        countPromotion++
                    }
                }
                return data
            })

            if (countPromotion < 2) {
                this.state.discount = 0
            } else {
                context.commit("addPromotion", { id: (countPromotion - 2), data: response.data[0] })
                // state.discount = value.discounts[countPromotion - 2]
            }
        }
    }
})
export function useStore() {
    return baseUseStore(key)
}

