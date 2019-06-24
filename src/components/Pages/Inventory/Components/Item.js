import React from 'react';
import "../../../../css/inventory_page.css"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            cuerrent_state: 'Found',
            size: 0
        }

     
    }
    componentWillReceiveProps(p){
        console.log(p.current_display_items.length)
        var s = p.current_display_items.length
        this.setState({
            items:p.current_display_items,
            size:s
        })

    }

    render() {

        if(this.state.size !== 0)
        {       
            console.log(this.state.items)

            return (
                <div>
                    {
                        this.state.items.map((item, i) => {
                            return (
                                <span className="inventory_item" key={i}>
                                    <img alt="pic" className="item_img" src={item.picpath} />
                                    <a
                                        className="item_title"
                                        href={'../item/' + item._id}
                                        key={i}
                                    >
                                        {item.title}
                                    </a>
                                    <p className="item_description">{item.desc}</p>
                                </span>
                            )
                        })
                    }
                </div>
            );
        }else{
            return(
                <div>

                </div>
            )
        }
    }
}
export default Item;

