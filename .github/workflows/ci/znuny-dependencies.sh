#!/usr/bin/env bash
#
# Pin of znuny/Znuny .github/workflows/ci/dependencies.sh for Snippet CI.
# Debian 11: libsoap-lite-perl Depends on libossp-uuid-perl, which Conflicts with
# libdata-uuid-perl (required by Znuny). Skip the apt SOAP::Lite package and
# install SOAP::Lite from CPAN instead.
# VSCode-Znuny bin/znuny.GenerateVSCSnippets.pl also needs List::MoreUtils (not always in Znuny cpan-lib).
# Refresh periodically from: https://github.com/znuny/Znuny/blob/dev/.github/workflows/ci/dependencies.sh

set -o errexit
set -o pipefail

apt-get update
apt-get upgrade -y
apt-get install -y --no-install-recommends libapache2-mod-perl2 \
  libtimedate-perl libnet-dns-perl libnet-ldap-perl \
  libio-socket-ssl-perl libpdf-api2-perl libdbi-perl libdbd-mysql-perl \
  libtext-csv-xs-perl libjson-xs-perl liblist-moreutils-perl \
  libapache-dbi-perl libxml-libxml-perl libxml-libxslt-perl \
  libspreadsheet-xlsx-perl libyaml-perl libyaml-libyaml-perl libarchive-zip-perl \
  libcrypt-eksblowfish-perl libencode-hanextra-perl \
  libauthen-sasl-perl libdata-uuid-perl libdigest-sha-perl \
  libscalar-list-utils-perl libwww-perl libtime-piece-perl \
  libmail-imapclient-perl libtemplate-perl libdatetime-perl \
  libmoo-perl liblocale-po-perl libhash-merge-perl \
  libxml2-utils libical-parser-perl libexpat1-dev \
  libssl-dev libxml2-dev zlib1g-dev \
  apache2 gnupg2 mariadb-client cpanminus make gcc git npm gettext gnupg

# SOAP::Lite: avoid apt libsoap-lite-perl (pulls libossp-uuid-perl; conflicts libdata-uuid-perl)
cpanm --notest SOAP::Lite

# Net::SAML2 (no Debian/Ubuntu package, install via CPAN)
cpanm --notest Net::SAML2
