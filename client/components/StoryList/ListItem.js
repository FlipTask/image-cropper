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
        author
    } = props.data;
    if (!title) {
        return null;
    }
    const className = getClassForPoints(points);
    return (
        <tr className="row-item">
            <td className="row-item__td">{numComments || "-"}</td>
            <td className={`row-item__td ${className}`}>{points || "-"}</td>
            <td className="row-item__td">
                <span className="caret-upvote"></span>
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
                                <a href="#">hide</a>
                            </small>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ListItem;
