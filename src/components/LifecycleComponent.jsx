import React from 'react';

class LifecycleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            todos: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickUnmount = this.handleClickUnmount.bind(this);
    };

    componentDidMount(){
        console.log("Component Did Mount from Class Component");
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImliYWR0b2ZmQGdtYWlsLmNvbSIsImlkIjo2MjIsImlhdCI6MTcxMTkxNTAzMH0.ovejTfPPzlPYaAWAAVm_kSzArE_-aFaSPbG-DtcUcjw"
        fetch('https://todo-redev.herokuapp.com/api/todos?isCompleted=false', {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => this.setState(prev => ({...prev, todos: data})));
    };

    componentWillUnmount(props, state) {
        console.log("Component Will Unmount from Class Component");
    };

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.count);
        console.log("Component Did Update from Class Component");
    };

    
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.count % 2 === 0) {
            return true
        } return false
    };
    
    handleClick() {
        this.setState(prev => ({count: prev.count + 1}))
    };

    handleClickUnmount() {
        this.setState(prev => ({...prev, todos: []}));
    };

    render() {
        return (
            <>
                <div>Class component</div>
                <div>{this.state.count}</div>
                <div onClick={this.handleClick}>Click</div>
                <div>
                    {
                        this.state.todos && 
                        this.state.todos.map(({id, title}) => <div key={id}>{title}</div>)
                    }
                </div>
                <div onClick={this.handleClickUnmount}>Unmount</div>
            </>
        )
    }
};

export default LifecycleComponent;