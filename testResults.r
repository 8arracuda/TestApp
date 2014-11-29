#Nexus4
LocalStorage_C1_500<-c(134,147,137,103,100,103,116,120,97,147);
FileAPI_C1_500<-c(10926,11698,9836,9191,9865,10585,9376,11322,9536,9075);
WebSQL_C1_500<-c(3,0,0,0,0,0,0,0,0,1);
WebSQL_C2_500<-c(1,0,0,7,0,1,0,0,0,1);
#placeholder values:
IndexedDB_C1_500<-c(20,60,30,70,20,60,30,10,10,20);
FileAPI_C1_500<-c(10,80,10,20,70,40,20,10,60,10);
SessionStorage_C1_500<-c(20,80,20,30,30,30,70,30,70,30);
SQLitePlugin_C1_500<-c(20,50,10,20,70,40,10,60,20,60);

Nexus4<-data.frame(LocalStorage_C1_500,WebSQL_C1_500, IndexedDB_C1_500,FileAPI_C1_500,SessionStorage_C1_500,SQLitePlugin_C1_500);
colnames(Nexus4) <- c("LocalStorage_C1_500", "WebSQL_C1_500", "IndexedDB_C1_500", "FileAPI_C1_500","SessionStoage_C1_500","SQLitePlugin_C1_500");
#Nexus4<-data.frame(LocalStorage_C1_500, FileAPI_C1_500, WebSQL_C1_500, WebSQL_C2_500)

WebSQL_C1_500_IOS8Sim<-c(0,0,0,1,0,0,0,0,0,0);
WebSQL_C2_500_IOS8Sim<-c(0,0,0,0,0,0,0,8,0,0);
LocalStorage_C1_500_IOS8Sim<-c(3,3,3,3,3,3,3,2,2,2);
FileAPI_C1_500_IOS8Sim<-c(1050, 994, 879,1159,942, 1062, 859,923, 950, 953);

#ChromeMacbook
IndexedDB_U1_500<-c(48,48,49,59,50,50,47,48,51,49);
IndexedDB_C1_500<-c(196,178,172,166,176,171,187,201,171,167);
IndexedDB_C2_500<-c(518,433,396,486,493,489,474,479,431,515);
LocalStorage_C1_500<-c(13,12,9,12,12,12,13,10,13,13);
LocalStorage_C2_500<-c(173,167,153,152,163,161,156,152,166,160);
WebSQL_C1_500<-c(0,0,0,0,0,0,0,0,0,0);
#placeholder values:
IndexedDB_C1_500<-c(10,20,30,40,30,40,30,20,30,40);
FileAPI_C1_500<-c(20,10,30,50,80,40,20,10,70,20);
SessionStorage_C1_500<-c(80,80,70,50,50,50,40,30,30,30);
SQLitePlugin_C1_500<-c(10,40,40,40,70,70,70,70,10,30);

ChromeMacbook<-data.frame(LocalStorage_C1_500,WebSQL_C1_500, IndexedDB_C1_500,FileAPI_C1_500,SessionStorage_C1_500,SQLitePlugin_C1_500);
colnames(ChromeMacbook) <- c("LocalStorage C1_500", "WebSQL C1_500", "IndexedDB C1_500", "FileAPI C1_500","SessionStorage C1_500","SQLitePlugin C1_500");



par(mar=c(8,15,4,4));
boxplot(ChromeMacbook,main="Chrome on Macbook", las=2, xlab='ms', horizontal = TRUE);
boxplot(Nexus4,main="Nexus 4", las=2, xlab='ms', horizontal = TRUE);

#boxplot(Nexus4[LocalStorage_C1_500,1], ChromeMacbook[LocalStorage_C1_500,1]);
#boxplot(Nexus4[LocalStorage_C1_500,], ChromeMacbook[LocalStorage_C1_500,]);
#boxplot(Nexus4,las=2, xlab='ms', horizontal = TRUE);

#boxplot(LocalStorage_C1_500, FileAPI_C1_500, WebSQL_C1_500_Nexus4);

#boxplot(LocalStorage_C1_500, FileAPI_C1_500, WebSQL_C1_500_Nexus4);
#boxplot(FileAPI_C1_500_IOS8Sim, FileAPI_C1_500_Nexus4);

