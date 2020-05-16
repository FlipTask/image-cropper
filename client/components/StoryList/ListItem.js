import React from "react";

const getOriginFromUrl = (str) => {
    if(!str){
        return null;
    }
    try{
        const url = new window.URL(str);
        return url.origin;   
    }catch(err){
        // console.log(err);
        return str;
    }
}

export default (props) => {
    const {
        num_comments, // Number of comments
        points, // Vote Count
        title,
        url,
        author,
        created_at
    } = props.data;
    if(!title){
        return null;
    }
    
    const getClassForPoints = (points=0) => {
        if(points >= 50 && points < 100){
            return "text-brown"
        }else if(points >= 100){
            return "text-orange";
        }else{
            return null;
        }
    }
    const className = getClassForPoints(points);
    return (
        <tr className="row-item">
            <td className="row-item__td">{num_comments || "-"}</td>
            <td className={`row-item__td ${className}`}>{points || "-"}</td>
            <td className="row-item__td">
                <span className="caret-upvote"></span>
            </td>
            <td className="row-item__td">
                <div className="row-item__info clearfix">
                    <div className="row-item__info--title">
                        <a href={url} target="__blank" suppressHydrationWarning={true}>
                            {title}
                        </a>
                        <small>{getOriginFromUrl(url)}</small>
                    </div>
                    <div className="row-item__info--meta">
                        <div className="row-item__info--meta-block">
                            <small>by <strong>{author}</strong></small>
                        </div>
                        <div className="row-item__info--meta-block">
                            <small>
                                <a href="#">hide</a>    
                            </small>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}