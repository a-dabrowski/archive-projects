import React, { Component } from 'react';
import theme from './theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListItem from 'react-toolbox/lib/list/ListItem';
//import Button from "react-toolbox/lib/button/Button";
import WriteRecipe from './WriteRecipe.js';

class App extends Component {
  state={
    recipes: localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')): [
      {
        name: 'lasagne',
        ingredients: 'macaroni, tomato, bolshecvik sauce',
      },
      {
        name: 'pizza',
        ingredients: 'flour, olives, tomato sauce',
      }
    ], 
  }
  
  componentDidUpdate = (nextProps) => {
    console.log('component update');
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  handleSave = (name, ingredients) => {
    this.setState(prevState =>({
      recipes: [...prevState.recipes, {name: name, ingredients: ingredients}]
    }));
  }

  handleEdit = (name, ingredients) => {
    
    //if name is changed, clone to new recipe
    const index = this.state.recipes.findIndex(obj => obj.name === name);
    if(index < 0){this.handleSave(name,ingredients);
    } else{
    this.setState((prevState)=>{
      prevState.recipes[index].name = name;
      prevState.recipes[index].ingredients = ingredients;
    });}
    //TODO: pass to localStorage
    this.forceUpdate();
    console.log(this.state)
  }

  handleDelete = (name) => {
    const index = this.state.recipes.findIndex(obj => obj.name === name);
    const arrayRecipes = [...this.state.recipes];
    arrayRecipes.splice(index, 1);
    this.setState({recipes: arrayRecipes});
  };

  render() {
    return (
      <div>
      <ThemeProvider theme={theme}>
      <div>
      <List selectable ripple>
      <ListSubHeader caption="Your recipes in one place" />
      {this.state.recipes.map((el, i)=>{
        return (
          <ListItem caption={el.name}>
            <WriteRecipe name={el.name} ingredients={el.ingredients} title={'edit'} save={this.handleEdit} delete={this.handleDelete}  />
          </ListItem>
        );
      })}

    <ListItem
      caption='Rorschach'
      legend='Walter Joseph Kovacs'
      rightIcon='star'
    />
      </List>
      <WriteRecipe name={""} title="New Recipe" save={this.handleSave} clear/>
      </div>
    </ThemeProvider>
      </div>
    );
  }
}

export default App;