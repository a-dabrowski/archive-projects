import React, { Component } from "react";
import Button from "react-toolbox/lib/button/Button";
import Dialog from "react-toolbox/lib/dialog/Dialog";
import "./theme.css";
import Input from "react-toolbox/lib/input/Input";

class WriteRecipe extends Component {
  state = {
    active: false,
    name: this.props.name,
    ingredients: this.props.ingredients,
  };

  static defaultProps = {
    delete: ()=>{}
  };

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  clear = () => {
    this.setState({name: "", ingredients: ""});
  };

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Save", onClick: ()=>{
      this.props.save(this.state.name, this.state.ingredients);
      if(this.props.clear){this.clear();}
      this.handleToggle();
    }},
    {
      label: "Delete",
      onClick: () => {
        this.props.delete(this.state.name);
        this.handleToggle();
      }
    }
  ];

  render() {
    return (
      <div>
        <Button
          label={this.props.title || "default"}
          onClick={this.handleToggle}
          primary
          raised
        />
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="Write Recipe"
        >
          <section>
          <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={64} />
          <Input type='text' multiline label='Ingredients' name='ingredients' value={this.state.ingredients} onChange={this.handleChange.bind(this, 'ingredients')} />
          </section>
        </Dialog>
      </div>
    );
  }
}

export default WriteRecipe;