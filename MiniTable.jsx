import {
    Box,
    Grid,
    IconButton,
    Table as MaterialTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { AddBlue } from '../../../../../assets/icons';
import styles from './styles';
import NotFound from '../../../../common/NotFound';
import { v4 } from 'uuid';
import LaserTableRow from './LaserTableRow';
import domtoimage from 'dom-to-image';

const headCells = ['Area', 'Side', 'Skin type', 'Handpiece', 'Fluence (Jcm2)', 'PW (ms)', 'Shots', 'TP', 'Problem', ''];

function Table({ classes, formRef, disabled }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(
            formRef.current.lhrRows || [
                {
                    testPatch: false,
                    problem: false,
                    id: v4()
                }
            ]
        );
        //eslint-disable-next-line
    }, []);

    const updateFormRef = lhrRows => {
        formRef.current.lhrRows = lhrRows;
    };

    const addRow = () => {
        const lhrRows = [...rows, { testPatch: false, problem: false, id: v4() }];
        setRows(lhrRows);
        updateFormRef(lhrRows);
    };

    const deleteRow = index => {
        const newArr = [...rows];
        setRows([]);
        newArr.splice(index, 1);
        setRows(newArr);
        updateFormRef(newArr);
    };

    const setValue = (e, index) => {
        const row = rows[index];
        row[e.target.name] = e.target.value;
        const newRows = [...rows];
        newRows.splice(index, 1, row);
        setRows(newRows);
        updateFormRef(newRows);
    };
    const setAutocompleteValue = (value, index, key) => {
        const row = rows[index];
        row[key] = value;
        const newRows = [...rows];
        newRows.splice(index, 1, row);
        setRows(newRows);
        updateFormRef(newRows);
    };
    const treatmentBlockDocument=document.getElementById('treatmentBlock');
    domtoimage.toPng(treatmentBlockDocument)
    .then(function (dataUrl) {
        console.log(dataUrl)
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    const renderTable = () => {
        const totalShots = `Total Shots ${rows.reduce((counter, row) => {
            if (isNaN(row.shots)) {
                return counter;
            }
            return Number(row.shots) + counter;
        }, 0)}`;
        return (
            <Box>
                {rows.length ? (
                    <>
                        <MaterialTable size="small" stickyHeader className={`${classes.table} scrollbar-test`}>
                            <TableHead>
                                <TableRow>
                                    {headCells.map(headCell => (
                                        <TableCell key={headCell} align="center" padding="none" className={classes.tableHead}>
                                            {headCell}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => {
                                    return (
                                        <LaserTableRow
                                            key={`${row.id}-${index}`}
                                            id={row.id}
                                            classes={classes}
                                            setValue={setValue}
                                            setAutocompleteValue={setAutocompleteValue}
                                            deleteRow={() => deleteRow(index)}
                                            row={row}
                                            index={index}
                                            disabled={formRef.current.lockEdit || disabled}
                                        />
                                    );
                                })}
                            </TableBody>
                        </MaterialTable>
                        {/* <Typography className={classes.totalShots}>{totalShots}</Typography> */}
                    </>
                ) : (
                    <NotFound message="No rows added" />
                )}
            </Box>
        );
    };
    return (
        <div className={classes.treatmentBlock} id="treatmentBlock">
            {renderTable()}
            {!disabled && (
                <Box p={2}>
                    <Grid  direction="row" justify="space-between">
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.defaultFont}>
                                New row
                            </Typography>
                            <IconButton disabled={formRef.current.lockEdit} onClick={addRow}>
                                <AddBlue variant="admin" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Box>
            )}
        </div>
    );
}

Table.propTypes = {
    classes: PropTypes.object.isRequired,
    formRef: PropTypes.object.isRequired,
    disabled: PropTypes.bool
};

export default withStyles(styles)(Table);
