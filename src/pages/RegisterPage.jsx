import {Flex} from "@chakra-ui/react";
import RegisterForm from "../components/register/RegisterForm.jsx";
import { RegisterHeader } from "../components/FormHeaders.jsx";

function RegisterPage() {
    return (
        <Flex flexDirection={'column'} gap={5} minHeight={'100vh'}>
            <RegisterHeader/>
            <RegisterForm />
        </Flex>
    );
}

export default RegisterPage;