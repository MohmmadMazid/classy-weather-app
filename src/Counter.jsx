import React from "react";

class Counter extends React.Component {

    constructor(props){
      super(props);
      this.state = {count:0};
      this.handleDecrease = this.handleDecrease.bind(this);  // normal function would be bind here

    }

    handleIncrease = ()=>{
      this.setState((prevState)=>{
        return {count:prevState.count+1}
      })
    }


    // if you create the normal function then you have to bind that function inside the constructor then it will work the fine 
    // otherwise it will give you the undefined value at the runtime 
    handleDecrease(){
      this.setState((prevState)=>{
        return{ count:prevState.count-1};
      })
    }

    handleDoubleIncreament = ()=>{
      this.setState((prevState)=>{
        return {count:prevState.count+2};
      })
    }
    
    render() {
      // we can also the write the logic inside the render method if the logic not bigger 
      const date = new Date("March 8, 2026");
      date.setDate(date.getDate() + this.state.count);
      

    return (
      <div>
            <button onClick={this.handleDecrease}>-</button>
            {/* date must be converted into the string format other wise it will produce the error */}
               <p>
               {date.toDateString()} {this.state.count}   
               </p>
            <button onClick={this.handleIncrease}>+</button>
            <button onClick={this.handleDoubleIncreament}>+2</button>
      </div>
    )

  }
}


export default Counter;
// import React from "react";

// class Counter extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = { count: 0 };
//   }

//   getDate(){
//     const date = new Date("March 8, 2026");
//     // this.setState((prevState)=>{
//     //   return {count:prevState.count+1};
//     // })
//     date.setDate(date.getDate() + this.state.count);
//     return date.toDateString();
//   }

//   render() {
//     return (
//       <div>
//         <p>{this.getDate()}</p>
//         <button onClick={this.getDate}>next data</button>
//       </div>
//     )
//   }
// }

// export default Counter;