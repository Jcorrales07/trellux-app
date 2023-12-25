import {Flex, Heading, Text} from "@chakra-ui/react";
function ErrorPage() {

    return (
        <Flex flexDirection={'column'} minHeight={'100vh'} alignItems={'center'} justifyContent={'center'}>
            <Heading>404</Heading>

            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text>Sorry, what you are looking for doesn't exists</Text>
            <Text>Check the path: {document.location.pathname}</Text>
        </Flex>
    );
}

export default ErrorPage;