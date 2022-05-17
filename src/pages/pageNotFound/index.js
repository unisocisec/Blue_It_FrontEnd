import React from "react";
import { Box } from "@mui/material";


const PageNotFound = () => {

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				mt: '40vh',
			}}
		>
			<h1>Esta pagina não foi encontrada</h1>
		</Box>
	);
};

export default PageNotFound;