import { StyledMainPage } from "./MainPage.styled";
import { Section } from "../../Section/Section";
import { Container } from "../../Container/Container";



export const MainPage = () => {


    
    return(
        <Section>
            <Container>
                <StyledMainPage>
                    <h1>Welcome, You Are Logged In</h1>
                </StyledMainPage>
            </Container>
        </Section>
    )
};