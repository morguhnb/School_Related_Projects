import React from "react";
import renderer from "react-test-renderer";

import HomeScreen from "../../components/HomeScreen";

describe("<HomeScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
