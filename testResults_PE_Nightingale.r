tmp_C1_IOSSim <- as.matrix(tmp_matrix_IOSSIM_means[c(1,seq(33,96, by=16))])
tmp_C1_Android <- as.matrix(tmp_matrix_Nexus7_means[c(1,seq(33,96, by=16))])
tmp_C1_wp8 <- as.matrix(tmp_matrix_Lumia620_means[c(1,seq(33,96, by=16))])

stars(tmp_matrox_IO, flip.labels=FALSE, key.loc=c(13,2.5), draw.segments=TRUE, col.segments=1:8)
dev.off()
