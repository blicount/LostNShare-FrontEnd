import React from 'react';
import "../../../../css/inventory_page.css"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            cuerrent_state: 'Found',

        }

    }

    render() {
        console.log(this.props.current_display_items)
        if(this.props.current_display_items.length < 0)
        {       
            return (
                <div>
                    {
                        this.props.current_display_items.map((item, i) => {
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

