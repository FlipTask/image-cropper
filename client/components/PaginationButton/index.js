import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class PaginationButton extends Component {
    render() {
        const { data } = this.props;
        const currPage = data.page;
        const maxPage = data.nbPages;
        return (
            <React.Fragment>
                <Link
                    to={`/?page=${currPage >= 1 ? currPage - 1 : 0}`}
                    className={`${currPage === 0 ? "disabled" : ""} nav-btn text-orange`}
                >
                    Previous
                </Link>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <Link
                    to={`/?page=${(currPage >= 0 && currPage < maxPage) ? currPage + 1 : maxPage}`}
                    className={`${currPage === maxPage ? "disabled" : ""} nav-btn text-orange`}
                >
                    Next
                </Link>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ stories }) => ({
    data: stories.data
});

export default withRouter(connect(mapStateToProps, {
})(PaginationButton));
