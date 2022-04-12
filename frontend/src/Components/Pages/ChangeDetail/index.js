import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-radius: 8px;
    background: #f4f7f8;
    text-align: center;
    padding: 5% 0;
    height: 100%;
`;

const Header = styled.h1`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300 bold;
    text-align: center;
    color: #43D1AF;
    margin: -16px -16px 16px -16px;
    // width: 20%;
`;

const Text = styled.h3`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300;
    text-align: center;
    margin: -16px -16px 16px -16px;
    // width: 20%;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinAnimation = css`
  ${spin} 1s infinite linear
`;

const Spinner = styled.div`
  pointer-events: all;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: 5px solid
    rgba(255, 255, 255, 0.2);
  border-top-color: #43D1AF;
  border-right-color: #43D1AF;
  animation: ${spinAnimation};
  transition: border-top-color 0.5s linear, border-right-color 0.5s linear;
  margin-left: 48%;
`;

function ChangeDetail(props) {
    const { changeId } = useParams();

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState([]);

    useEffect(() => {
        fetch(`/api/changes/${changeId}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setChange(data);
            })
    }, [])

    return (
        <Wrapper>
            <Header>Change Detail</Header>
            <Text>{change.subject}</Text>
            <div>
                {loading ? (
                    <Spinner/>
                ) : (
                    <div>
                        <Text>{change.id}</Text>
                        <Text>{change.number}</Text>
                        <Text>{change.project}</Text>
                        <Text>{change.branch}</Text>
                        <Text>{change.status}</Text>
                        <Text>{change.created}</Text>
                        <Text>{change.updated}</Text>
                        <Text>{change.submitted}</Text>
                        <Text>{change.insertions}</Text>
                        <Text>{change.deletions}</Text>
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

export default ChangeDetail;