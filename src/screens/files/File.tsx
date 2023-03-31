import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FileCopy, Download } from "@mui/icons-material";
import { listS3Files } from "../../services/s3";
import { _Object } from "@aws-sdk/client-s3";
import { Box, fontWeight } from "@mui/system";
import moment from "moment-timezone";

const REACT_APP_ENVIROMENT = process.env.REACT_APP_ENVIROMENT;
const REACT_APP_S3_BUCKET_WELLET = process.env.REACT_APP_S3_BUCKET_WELLET || "";

const folderCert = `${REACT_APP_ENVIROMENT}/public/certificates/`;

export const File = () => {
  const [files, setFiles] = useState<_Object[]>([]);

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const init = async () => {
      const s3Res = await listS3Files({ Prefix: folderCert });

      const { Contents = [] } = s3Res;
      setFiles(Contents);
    };
    init();
    return () => {};
  }, []);

  return (
    <div className="page-container">
      <Stack gap="0.5rem">
        <Accordion
          className="accordion-container"
          elevation={0}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon htmlColor="var(--color-primary)" />}
            aria-controls={`${1}bh-content`}
            id={`${1}bh-header`}
          >
            <Typography
              sx={{ width: "fit-content", flexShrink: 0 }}
              borderRadius={"8px"}
              padding={"0.3rem"}
              className="accordion-title-acc"
            >
              <FileCopy />
              {"Certificados"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="span"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              {files.map(({ Size, ETag, Key = "", LastModified }) => {
                const fileFullName = Key?.replace(folderCert, "");
                const fileExt = fileFullName.split(".").pop() || "";
                const fileName = fileFullName.replace(`.${fileExt}`, "");
                const image = `https://${REACT_APP_S3_BUCKET_WELLET}.s3.amazonaws.com/${Key}`;
                return (
                  <Card
                    sx={{ width: 170, backgroundColor: "#e9e9e9" }}
                    key={ETag}
                    elevation={0}
                    onClick={() => handleDownload(image)}
                  >
                    <CardActionArea sx={{ padding: 1 }}>
                      <Typography
                        gutterBottom
                        variant="button"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {fileFullName}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="50"
                        image={image}
                        sx={{ marginTop: 1, marginBottom: 1 }}
                      />
                      <Box sx={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          {moment
                            .tz(LastModified, "America/Argentina/Buenos_Aires")
                            .format("DD/MM/YY, HH:mm")}
                        </div>
                        <div
                          style={{
                            flex: 0,
                            alignItems: "flex-end",
                            display: "flex",
                          }}
                        >
                          <Download color="disabled" />
                        </div>
                      </Box>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </div>
  );
};
