import React, { useEffect, useCallback } from "react";
import Upload from "../../components/write/Upload";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initialize } from '../../modules/write';

const UploadContainer = () => {
    const dispatch = useDispatch();
    const { title, body, price, productName, auction, photo } = useSelector(({ write }) => ({
      title: write.title,
      body: write.body,
      photo: write.photo,
      price: write.price,
      productName: write.productName,
      auction: write.auction,
    })); 
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
      dispatch,
    ]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    
    return (
      <Upload
        onChangeField={onChangeField}
        title={title}
        body={body}
        price={price}
        productName={productName}
        photo={photo}
        auction={auction}
      />
    );
};
  
export default UploadContainer;
