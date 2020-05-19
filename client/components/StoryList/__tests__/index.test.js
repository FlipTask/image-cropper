import React from "react";
import { MemoryRouter } from "react-router-dom";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// eslint-disable-next-line import/no-self-import
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import StoryList from "../index";
import mockData from "../../../constants/mockData";

React.useLayoutEffect = React.useEffect;

const mockStore = configureMockStore();
const store = mockStore({
    stories: {
        loading: false,
        data: mockData
    }
});

configure({ adapter: new Adapter() });

test("Testing StoryList >>", () => {
    const component = shallow(
        <Provider store={store}>
            <MemoryRouter>
                <StoryList />
            </MemoryRouter>
        </Provider>
    );

    // const tree = component.toJSON();
    expect(component.render()).toMatchSnapshot();
});
