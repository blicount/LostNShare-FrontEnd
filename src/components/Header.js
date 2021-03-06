import React from 'react';
import NavigationBar from './NavigationBar'
import "../css/header.css"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            links: [
                { label: 'inventory', link: '/inventory', active: false },
                { label: 'report', link: '/report', active: false },
                { label: 'register', link: '/register', active: false },
                { label: 'login', link: '/login', active: false }
            ]
        };
        this.handleClickSelection = this.handleClickSelection.bind(this);
    };

    componentWillMount() {
        var name = JSON.parse(sessionStorage.getItem('userData'));

        if (sessionStorage.getItem('userData') == null) {
            this.setState({
                links: [
                    { label: 'inventory', link: '/inventory', active: false },
                    { label: 'report', link: '/report', active: false },
                    { label: 'register', link: '/register', active: false },
                    { label: 'login', link: '/login', active: false }
                ]
            })
        } else {
            var user_id = JSON.parse(sessionStorage.getItem('userData')).id;
            this.setState({
                links: [
                    { label: 'inventory', link: '/inventory', active: false },
                    { label: 'report', link: '/report', active: false },
                    { label: name.name, link: '/profile/' + user_id + '/', active: false },
                    { label: 'logout', link: '/', active: false },
                ]
            })
        }
    }



    handleClickSelection(e) {
        if (e.target.text === 'logout') {
            sessionStorage.removeItem('userData');
            localStorage.removeItem('PrevSideBarState');
            this.props.history.push('/');
        }
        this.state.links.forEach(element => {
            if (element.label === e.target.text) {
                element.active = true;
            } else {
                element.active = false
            }
        });
    }

    render() {
        return (
            <header>
                <span id="logo_nls">
                    <a href="/" ><img alt="logo" src="https://gdurl.com/Ss79" /></a>
                </span>
                <h1> LostNShare</h1>
                <NavigationBar links={this.state.links} handleClickSelection={this.handleClickSelection} />
            </header>
        );
    }
}

export default Header;
