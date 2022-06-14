import React, { useEffect, useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import Button from "@material-ui/core/Button";
import "./Search.css";
import axios from "axios";
import SearchResults from './SearchResults';
//import {MultiSelect} from "multiselect-react-dropdown"
import {Multiselect} from 'multiselect-react-dropdown';
import { Grid } from '@material-ui/core';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';

import baseUrl from "../../../utils/appconfig";
//This is the component where the search is done and the search result will be shown, for this the data is comming from the strapi. 
function Search(props) {
    //const [input, setInput] = useState("");
    const [show, setShow] = useState()
    const [value, setValue] = React.useState([]);
    const [value_tec, setValue_tec] = React.useState([]);
    
    const CssTextField = styled(TextField)({
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    });

    
    useEffect( () =>{
      props.setShowResult()
      axios
      .get("https://jobapp.freedynamicdns.org/users")
      .then(function(res){
         console.log("users :",res.data)
         // props.setShowResult() usestate function is comming from view/ProductHero
         props.setShowResult(res.data)

         // loc array is used to store location of users
         var loc = []
         
         res.data.map((val)=>{

          console.log('val.location',val.location)
          if(val.location){
            if(loc.indexOf(val.location.city)== -1){
              loc.push(val.location.city)
            }
          }else if(val.location == undefined){
            console.log("val.location == undefined")
          }
         })

         setValue(loc)
         
         // tec is used to store tachnology of users
         var tec = []
         res.data.map((val)=>{
          val.technologies.map((v)=>{
            if (Array.isArray(v.technology)){
              v.technology.map((j)=>{
                if(tec.indexOf(j)== -1){
                  tec.push(j)
                }
              })
           } else if(v.technology){
                if(tec.indexOf(v.technology)== -1){
                  tec.push(v.technology)
                 }
             }
          })
         })
         setValue_tec(tec)
    })
    .catch((err)=>{
      alert("no coonection")
    })
  }, [])




    
    return (
      <>
          <div style={{width:"100em", color:"white"}}>
            <Grid container spacing={3}
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
                <Grid item xs={4}>
                  <Autocomplete
                    multiple
                    onChange={(event, newValue) => {
                      props.setSearch_location(newValue);
                    }}
                    id="tags-outlined"
                    options={value_tec}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip label={option} sx= {{
                          backgroundColor: "white",
                        }} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="technology"
                        sx={{
                          '& label.Mui-focused': {
                            color: 'white',
                          },
                          '& label': {
                            color: 'white',
                          },
                          '& .MuiInput-underline:after': {
                            borderBottomColor: 'black',
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'white',
                              backgroundColor: 'transparent'
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'black',
                              color:'black',
                            },
                          },
                        }}
                      />
                    )}
                />
                </Grid>
                <Grid item xs={4}>

                  <Autocomplete
          multiple
          onChange={(event, newValue) => {
            props.setName(newValue);
          }}

          id="tags-outlined"
          options={value}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} sx= {{
                backgroundColor: "white",
              }} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="location"
              sx={{
                '& label.Mui-focused': {
                  color: 'white',
                },
                '& label': {
                  color: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'black',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                    backgroundColor: 'transparent'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    color:'black',
                  },
                },
              }}
            />
          )}
        />
                </Grid>
            </Grid>
          </div>
    </>
       
    )
}

export default Search;

            {/*<Multiselect
                onChange={search}
                style={{color:"black"}}
                //onSearch={search}
                options = {props.select}
                placeholder="Search Technology"
                isObject={false}
                onSelect={onselect}
                style={{
                color:"white",
              
              searchBox: {color:"red",
              backgroundColor:"rgba(231, 181, 181,0.8)"}
              ,
              inputField:{
                color:"white"
              }
              ,

              multiselectContainer: {
                color: 'black'
              },
              
            }}
          />*/}   

          {/*<Grid item xs={3}>
            <Multiselect
            onChange={search}
            style={{color:"black"}}
            //onSearch={search}
        options = {props.location}
        placeholder="Search location"
        isObject={false}
        onSelect={onselect1}
        style={{
          color:"white",
          
          searchBox: {color:"red",
          backgroundColor:"rgba(231, 181, 181,0.8)"}
          ,
          inputField:{
            color:"white"
          }
          ,

          multiselectContainer: {
            color: 'black'
          },
          
        }}
      />
        </Grid>
          <Grid item xs={3}>
            <Multiselect
            onChange={search}
            style={{color:"black"}}
            //onSearch={search}
        options = {props.experience}
        isObject={false}
        onSelect={onselect2}
        style={{
          color:"white",
          
          searchBox: {color:"red",
          backgroundColor:"rgba(231, 181, 181,0.8)"}
          ,
          inputField:{
            color:"white"
          }
          ,

          multiselectContainer: {
            color: 'black'
          },
          
        }}
        />   
      </Grid>
        </Grid>*/}