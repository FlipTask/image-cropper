import React,{Component} from "react";
import {connect} from "react-redux";
import PaginationButton from "./../PaginationButton";
import ListItem from "./ListItem";
import {fetchStories} from "../../actions";
import {withRouter} from "react-router";
import TableLoader from "./TableLoader";

const parseQueryString = (str) => {
    if(!str) return {};
    
    // remove ? from start of the string
    const varStrings = str.slice(1);
    const values = varStrings.split("&");
    return values.reduce((acc,val) => {
        const a = val.split("=");
        acc[a[0]] = a[1];
        return acc;
    },{});
}

class StoryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            currPage: (props.data && props.data.page) || 0
        }
        
    }
    
    static getDerivedStateFromProps(props,state){
        const {search} = props.location;
        const qParams = parseQueryString(search);
        try{
            if(parseInt(qParams.page) != parseInt(state.currPage)){
                props.fetchStories(qParams.page);
                return {
                    currPage: qParams.page
                }
            }
        }catch(e){
            
        }
        return null;
    }
    render(){
        const {data, loading} = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Vote Count</th>
                        <th>UpVote</th>
                        <th>News Details</th>
                    </tr>
                </thead>
                {
                    loading ? 
                    <TableLoader rows={30} columns={4}/>
                    :
                    <React.Fragment>
                        <tbody>
                            {
                                data && data.hits.map((item,i) => {
                                    return <ListItem data={item} key={i}/>
                                })
                            }
                            <tr className="footer">
                                <td colSpan="4" style={{
                                    textAlign: 'center',
                                    padding: "1.5em 1em"
                                    }}>
                                    <PaginationButton />
                                </td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                }
            </table>
        )
    }
}

const mapStateToProps = ({stories}) => ({
   data: stories.data,
   loading: stories.loading
});

export default withRouter(connect(mapStateToProps,{
    fetchStories
})(StoryList));