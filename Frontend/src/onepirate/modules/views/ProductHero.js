import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {Link as RouterLink} from "react-router-dom";
import Search from '../search/Search';
import SearchResults from '../search/SearchResults';


const backgroundImage =
//  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80'
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
    height:"500px"
  },
  button: {
    minWidth: 200,
    color:"white",
  },
});

function ProductHero(props) {
  const { classes } = props;
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState()
  const [select,setSelect] = useState([])
  const [location,setLocation] = useState([])
  const [experience,setExperience] = useState([])
  const [name,setName] = useState([])
  const [search_location, setSearch_location] = useState([])
  const [search_experience, setSearch_experience] = useState([])


  return (
      <>
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />

      
      <Search 
      setShowResult={setShowResult} 
      showResult={showResult} 
      setName={setName} 
      setSearch_location={setSearch_location}
      setSearch_experience={setSearch_experience}
      setInput={setInput} 
      setSelect={setSelect} 
      select={select}
      location={location}
      setLocation={setLocation}
      experience={experience}
      setExperience={setExperience}/>
    </ProductHeroLayout>
    <div className="search__Result">
    {showResult && <SearchResults  search_location ={search_location} search_experience ={search_experience} showResult={showResult} input={input} name={name}/>}
    </div>
      </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);