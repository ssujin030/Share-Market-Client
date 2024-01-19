import React from "react";
import Responsive from "../components/common/Responsive";
import UploadContainer from "../containers/write/UploadContainer";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";

const UploadPage = () => {
    return (
        <Responsive>
            <UploadContainer />
            <TagBoxContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    );
};

export default UploadPage;
