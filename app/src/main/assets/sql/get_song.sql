    select
        title
        ,file
        ,file_type
        ,volume_default
     from music_list m
        inner join audio_files a on a._id = m.audio_file_id
        inner join file_types t on t._id = a.file_type_id
     where
        soundscheme_id = '1'