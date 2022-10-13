import React from "react";
import './product.css';

export default class Product extends React.Component {

    state = {
        index: 0,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        return (
            <>
                <div className="card">
                    <div className="img"><img src={data.images[this.state.index]} /></div>
                    <div className="info">
                        <div className="title">
                            {data.title}
                            <span> {data.price}<strong>$</strong></span>
                        </div>
                        <div className="disc">{data.description}</div>
                        <div className="sizes-price">
                            <div className="sizes">
                                {data.images.map((e, i) => {
                                    return <span key={i} onClick={() => {
                                        this.setState({ index: i })
                                    }}>{i + 1}</span>
                                })}
                            </div>
                        </div>
                        <div className="btn">
                            <button>ADD</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}