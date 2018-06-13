import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  //have to update previousContentId here

  for (var i in result) {
    console.log(result);
    console.log(i);
    if (i == 0) {
      console.log(result[i]);
      result[i].previousContentId = 0;
    } else {
      console.log(result[i-1]);
      result[i].previousContentId = result[i-1].id
    }

  }

  return result;
};

//Find a way to not use this *value*
const SortableItem = SortableElement(({value}) => <div>
    <div className="dnd_item" onMouseEnter={() => {

      }}>
    Hey
    </div>
    {
      //Set current item to show data/content only
      //of course, tab-like
    }
    <div>
      {value}
    </div>
    <div>text</div>
  </div>);

const SortableList = SortableContainer(({items}) => {
    return (
      <div className="dnd_container">
        {items.map((item, index) => {
          return <SortableItem key={`item-${index}`} index={index} value={item.id} disabled={true} />;
        })}
      </div>
    );
});


class Boxs extends React.Component {
	constructor(props) {
    super(props);
    console.log("conten_dnd");
    console.log(props);
    this.state = {
        list: props.content ? props.content : []
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    console.log(oldIndex);
    console.log(newIndex);
    console.log(this.state.list);

    this.setState({
      list: reorder(this.state.list, oldIndex, newIndex)
    });
    console.log(this.state.list);


    this.props.onChange(this.state.list);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);
    this.setState({list: nextProps.content});
  }

  render() {
    console.log("eeeee");
    console.log(this.props.content);
    console.log(this.state.list);
    return (
      <div>
        <SortableList onClick={() => {
          console.log("Clicked");
        }} items={this.state.list} onSortEnd={this.onSortEnd.bind(this)} axis='xy' />
      </div>
    );
  }
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({value: nextProps.value});
  }
  render() {
    return (
      <div >


      </div>
    );
  }
}



export default class SortableDisabled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      tabIndex: 0
    }
    this.onSlideEnd = this.onSlideEnd.bind(this);
  }
  onSlideEnd(e) {
    this.setState({value : e.target.value});
  }

  componentDidMount(){
    console.log("did Mount");
    console.log(this.props.content.position);
    this.setState({tabIndex: this.props.content.position})
  }
  componentWillReceiveProps(props){
    console.log("componentWillReceiveProps - setstate");
    this.setState({tabIndex: props.content.position})
    console.log(props.content.position);
  }

  render() {
    const { content } = this.props;


    let tabs =[];
    let tabPanels = [];
    content.lesson.contents.map((item, i) => {
      tabs.push(<Tab><a href={`/content/${item.id}`} onClick={e => e.preventDefault()}>&#9776;</a></Tab>);
      tabPanels.push(<TabPanel>
        <h2>{content.data}</h2>
      </TabPanel>);
    })
    return (
      <div>


      {
        //1:current tab (current position?)
        //2: contentData (include position)
        //3: other content IDs
      }
      <div style={{

        }}>
        <Tabs

          selectedIndex={this.state.tabIndex}
          onSelect={(tabIndex) => {
            //set state for tabIndex
            this.setState({tabIndex})
            this.props.onChange(tabIndex);
          }}>
          <TabList>
            {tabs}
          </TabList>

          {
            // tabPanels
          }
        </Tabs>
      </div>



        {
          // <Boxs
          //   onClick={() => {
          //     console.log("Clicked");
          //   }}
          //   content={this.props.content}
          //   onChange={this.props.onChange}
          //   />
      }
      </div>
    );
  }
};
