import styled from "styled-components";

export const Container = styled.div<{ noteColor: string }>`
    .ql-editor {
        height: 200px;
        background-color: ${({ noteColor }) => noteColor}
    }
`

