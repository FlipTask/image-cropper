import React from "react";

const getOriginFromUrl = (str) => {
    if (!str) {
        return null;
    }
    try {
        const url = new window.URL(str);
        return url.origin;
    } catch (err) {
        // console.log(err);
        return str;
    }
};

const getClassForPoints = (points = 0) => {
    if (points >= 50 && points < 100) {
        return "text-brown";
    } if (points >= 100) {
        return "text-orange";
    }
    return null;
};

const ListItem = (props) => {
    const {
        num_comments: numComments, // Number of comments
        points, // Vote Count
        title,
        url,
        author,
        hidden
    } = props.data;
    if (!title || hidden) {
        return null;
    }
    const className = getClassForPoints(points);
    return (
        <tr className="row-item">
            <td className="row-item__td">{numComments || "-"}</td>
            <td className={`row-item__td ${className}`}>{points || "-"}</td>
            <td className="row-item__td">
                <div className="upvote-btn-wrapper" onClick={(e) => props.onUpVote(e, props.data)}>
                    <span className="caret-upvote" />
                </div>
            </td>
            <td className="row-item__td">
                <div className="row-item__info clearfix">
                    <div className="row-item__info--title">
                        <a href={url} target="__blank">
                            {title}
                        </a>
                        <small suppressHydrationWarning={true}>{getOriginFromUrl(url)}</small>
                    </div>
                    <div className="row-item__info--meta">
                        <div className="row-item__info--meta-block">
                            <small>by <strong>{author}</strong></small>
                        </div>
                        <div className="row-item__info--meta-block">
                            <small>
                                <a href="#" onClick={(e) => props.hideStory(e, props.data)}>hide</a>
                            </small>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ListItem;
