import React, { useState, useCallback, useEffect }from "react";
import styled from "styled-components";

const TagForm = styled.form`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 550px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  display: flex;
  
  input {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    width: 250px;
  }
  
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    border-radius: 4px;
    background: #3B495B;
    color: white;
    font-weight: bold;
    &:hover {
      background: #7F93AD;
    }
  }
`;

const Tag = styled.div`
  padding-left: 1.2rem;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }

  color: #000080;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const TagItem = React.memo(({ tag, onRemove }) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove} />
        ))}
    </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);
  
    const insertTag = useCallback(
      tag => {
        if (!tag) return; 
        if (localTags.includes(tag)) return;   
        const nextTags =[...localTags, tag];
        setLocalTags(nextTags);
        onChangeTags(nextTags);
      },
      [localTags, onChangeTags],
    );
  
    const onRemove = useCallback(
      tag => {
        const nextTags = localTags.filter(t => t !== tag);
        setLocalTags(nextTags);
        onChangeTags(nextTags);
      },
      [localTags, onChangeTags],
    );
  
    const onChange = useCallback(e => {
      setInput(e.target.value);
    }, []);
  
    const onSubmit = useCallback(
      e => {
        e.preventDefault();
        insertTag(input.trim()); 
        setInput(''); 
      },
      [input, insertTag],
    );

    useEffect(() => {
      setLocalTags(tags);
    }, [tags]);    
  
    return (
      <>      
        <TagForm onSubmit={onSubmit}>
          <input
            placeholder="지역 설정(선택사항)"
            value={input}
            onChange={onChange}
          />
          <button type="submit">추가</button>
        </TagForm>
        <TagList tags={localTags} onRemove={onRemove} />
      </>     
    );
};

export default TagBox;
