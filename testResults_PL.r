PL_LocalStorage_FindLimits1_Android<-c(764855,669248,144702,140894)
PL_LocalStorage_FindLimits1_iOS8<-c(390364, 341568, 73126, 71150)
barplot(PL_LocalStorage_FindLimits1_Android, PL_LocalStorage_FindLimits1_iOS8)

df_LocalStorage<-data.frame(PL_LocalStorage_FindLimits1_Android, PL_LocalStorage_FindLimits1_iOS8)
rownames(df_LocalStorage)<-c('Test1','Test2','Test3','Test4')
barplot(as.matrix(df_LocalStorage), beside=TRUE, horiz=TRUE)

