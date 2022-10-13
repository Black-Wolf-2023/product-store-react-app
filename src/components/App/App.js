import React from 'react';
import Product from '../product/product';
import './App.css';
export default class App extends React.Component {

    state = {
        data: [],
        DataisLoaded: false,
        stepen: []
    }


    componentDidMount() {
        (async () => {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();

            this.setState({ data, DataisLoaded: true, stepen: data })

        })();
    }


    render() {

        const { data, DataisLoaded, stepen } = this.state;
        let filter__cat = new Set();
        let filter__data__image = new Set();

        if (!DataisLoaded) return <div>Please Wait Data is Loading ...</div>

        data.filter((e) => {
            filter__cat.add(e.category.name);
        })

        stepen.filter((e) => {
            filter__data__image.add(e.images[0])
        })




        return (
            <>
                <header>
                    <input type="text" placeholder='Search...' onInput={({ target }) => {
                        if (target.value != '') {
                            this.setState({ stepen: stepen.filter(ele => ele.title.toLowerCase().includes(target.value)) })
                        } else {
                            this.setState({ stepen: data.filter(ele => ele) })
                        }
                    }} />
                    <select onChange={({ target }) => {
                        if (target.value == 'all') {
                            this.setState({ stepen: data.filter(ele => ele) })
                        } else {
                            this.setState({ stepen: data.filter(ele => ele.category.name == target.value) })
                        }
                    }}>
                        <option value="all">All</option>
                        {
                            Array.from(filter__cat).map(e => {
                                return <option key={e} value={e}>{e}</option>
                            })
                        }
                    </select>
                </header>
                <div className='container'>
                    {
                        stepen.map(ele => {
                            return <Product data={ele} key={ele.id} />
                        })
                    }
                </div>
            </>
        )
    }
}