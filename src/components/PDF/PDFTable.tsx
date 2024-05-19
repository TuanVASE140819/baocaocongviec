import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Component để hiển thị và xuất PDF
const RowData = {
    column1: 'Data 1',
    column2: 'Data 2',
    column3: 'Data 3',
    };
    // Tạo dữ liệu mẫu

const PDFTable = ({ data }: { data: typeof RowData[] }) => {
  // Định nghĩa kiểu dữ liệu PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',


    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      marginBottom: 10,
      fontWeight: 'bold',
        fontSize: 20,   
        //  Fromt tiếng việt
        // fontFamily: ' Times New Roman',



    },
    table: {
        display: 'flex',
        // width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,  
        
        

    },
    tableRow: {
      flexDirection: 'row',
    },  
    tableCell: {
      margin: 5,
      padding: 5,
      flexGrow: 1,
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 1,
      borderTopWidth: 1,
    },

    

  });

  // Tạo PDF
return (
    <PDFViewer width="100%" height="600px">
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Bảng dữ liệu</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell}>
                                <Text>Column 1</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text>Column 2</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text>Column 3</Text>
                            </View>
                            {/* Thêm các cột khác nếu cần */}
                        </View>
                        {data.map((row: RowData, index: number) => (
                            <View key={index.toString()} style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text>{row.column1}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{row.column2}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{row.column3}</Text>
                                </View>
                                {/* Thêm các dòng khác nếu cần */}
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    </PDFViewer>
);
};

export default PDFTable;
